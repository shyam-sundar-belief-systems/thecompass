const { Client } = require('pg');
require('dotenv').config();

async function verifyDatabase() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('✅ Connected to Neon Dev database\n');

    const tablesResult = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);

    console.log('📊 Database Tables:');
    tablesResult.rows.forEach(row => {
      console.log(`  - ${row.table_name}`);
    });

    const userCount = await client.query('SELECT COUNT(*) FROM "User"');
    const tenantCount = await client.query('SELECT COUNT(*) FROM "Tenant"');
    const kpiCount = await client.query('SELECT COUNT(*) FROM "KPI"');
    const objectiveCount = await client.query('SELECT COUNT(*) FROM "Objective"');

    console.log('\n📈 Data Summary:');
    console.log(`  - Tenants: ${tenantCount.rows[0].count}`);
    console.log(`  - Users: ${userCount.rows[0].count}`);
    console.log(`  - Objectives: ${objectiveCount.rows[0].count}`);
    console.log(`  - KPIs: ${kpiCount.rows[0].count}`);

    const users = await client.query('SELECT email, role FROM "User" ORDER BY role');
    console.log('\n👥 Seeded Users:');
    users.rows.forEach(user => {
      console.log(`  - ${user.email} (${user.role})`);
    });

    console.log('\n✅ Database verification complete!');
  } catch (error) {
    console.error('❌ Error verifying database:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

verifyDatabase();
