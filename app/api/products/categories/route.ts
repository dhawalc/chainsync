import { NextResponse } from 'next/server';
import { initializeSnowflake, connectSnowflake, executeQuery } from '@/lib/snowflake';

// Define the category structure
interface Category {
  CATEGORY_ID?: string | number;
  CATEGORY_NAME?: string;
  ID?: string | number;
  NAME?: string;
  DESCRIPTION?: string;
  [key: string]: any; // Allow for additional properties
}

export async function GET() {
  try {
    console.log("Initializing Snowflake connection for product categories...");
    const connection = initializeSnowflake();
    
    console.log("Connecting to Snowflake...");
    await connectSnowflake(connection);
    console.log("Connected to Snowflake successfully");

    // Set session context
    await executeQuery(connection, `USE WAREHOUSE ${process.env.SNOWFLAKE_WAREHOUSE}`);
    await executeQuery(connection, `USE DATABASE ${process.env.SNOWFLAKE_DATABASE}`);
    await executeQuery(connection, `USE SCHEMA ${process.env.SNOWFLAKE_SCHEMA}`);

    // Query to get product categories
    const query = `
      SELECT DISTINCT CATEGORY 
      FROM PRODUCTS 
      WHERE CATEGORY IS NOT NULL
      ORDER BY CATEGORY
    `;
    
    const categories = await executeQuery(connection, query);
    
    // Create a more robust response that handles different column names
    const formattedCategories = categories.map((cat: Category) => {
      // Try to find the ID and name columns with various possible names
      const id = cat.CATEGORY_ID || cat.ID || Object.values(cat)[0];
      const name = cat.CATEGORY_NAME || cat.NAME || cat.DESCRIPTION || cat.CATEGORY || `Category ${id}`;
      
      return {
        id,
        name,
        originalData: cat
      };
    });
    
    return NextResponse.json({ 
      success: true,
      categories: formattedCategories
    });
  } catch (error: any) {
    console.error('Error fetching product categories:', error);
    return NextResponse.json({ 
      success: false,
      error: error.message 
    }, { status: 500 });
  }
} 