// app/api/audit/route.ts
import { NextResponse } from 'next/server';

// Mock audit data
const mockAuditData = [
  {
    AUDIT_ID: 1,
    TABLE_NAME: 'PRODUCT_MASTER',
    RECORD_ID: '1001',
    FIELD_NAME: 'DESCRIPTION',
    OLD_VALUE: null,
    NEW_VALUE: 'Product 1001',
    CHANGE_TYPE: 'INSERT',
    CHANGED_BY: 'system@example.com',
    CHANGE_DATE: '2023-05-15T10:30:00Z'
  },
  {
    AUDIT_ID: 2,
    TABLE_NAME: 'PRODUCT_MASTER',
    RECORD_ID: '1002',
    FIELD_NAME: 'DESCRIPTION',
    OLD_VALUE: null,
    NEW_VALUE: 'Product 1002',
    CHANGE_TYPE: 'INSERT',
    CHANGED_BY: 'system@example.com',
    CHANGE_DATE: '2023-05-15T10:35:00Z'
  },
  {
    AUDIT_ID: 3,
    TABLE_NAME: 'PRODUCT_MASTER',
    RECORD_ID: '1001',
    FIELD_NAME: 'DESCRIPTION',
    OLD_VALUE: 'Product 1001',
    NEW_VALUE: 'Updated Product 1001',
    CHANGE_TYPE: 'UPDATE',
    CHANGED_BY: 'john.doe@example.com',
    CHANGE_DATE: '2023-05-16T09:15:00Z'
  },
  {
    AUDIT_ID: 4,
    TABLE_NAME: 'HIERARCHY_TREE',
    RECORD_ID: '1',
    FIELD_NAME: 'NODE_NAME',
    OLD_VALUE: 'Electronics',
    NEW_VALUE: 'Electronic Products',
    CHANGE_TYPE: 'UPDATE',
    CHANGED_BY: 'jane.smith@example.com',
    CHANGE_DATE: '2023-05-16T14:20:00Z'
  },
  {
    AUDIT_ID: 5,
    TABLE_NAME: 'TIME_PHASED_CYCLETIME',
    RECORD_ID: '1001',
    FIELD_NAME: 'CYCLE_TIME',
    OLD_VALUE: '10',
    NEW_VALUE: '12',
    CHANGE_TYPE: 'UPDATE',
    CHANGED_BY: 'john.doe@example.com',
    CHANGE_DATE: '2023-05-17T11:45:00Z'
  },
  {
    AUDIT_ID: 6,
    TABLE_NAME: 'PRODUCT_MASTER',
    RECORD_ID: '1003',
    FIELD_NAME: 'DESCRIPTION',
    OLD_VALUE: null,
    NEW_VALUE: 'Product 1003',
    CHANGE_TYPE: 'INSERT',
    CHANGED_BY: 'jane.smith@example.com',
    CHANGE_DATE: '2023-05-18T08:30:00Z'
  },
  {
    AUDIT_ID: 7,
    TABLE_NAME: 'PRODUCT_MASTER',
    RECORD_ID: '1003',
    FIELD_NAME: 'DESCRIPTION',
    OLD_VALUE: 'Product 1003',
    NEW_VALUE: null,
    CHANGE_TYPE: 'DELETE',
    CHANGED_BY: 'admin@example.com',
    CHANGE_DATE: '2023-05-19T16:10:00Z'
  },
  {
    AUDIT_ID: 8,
    TABLE_NAME: 'HIERARCHY_TREE',
    RECORD_ID: '2',
    FIELD_NAME: 'PARENT_NODE_ID',
    OLD_VALUE: null,
    NEW_VALUE: '1',
    CHANGE_TYPE: 'UPDATE',
    CHANGED_BY: 'system@example.com',
    CHANGE_DATE: '2023-05-20T10:05:00Z'
  },
  {
    AUDIT_ID: 9,
    TABLE_NAME: 'TIME_PHASED_CYCLETIME',
    RECORD_ID: '1002',
    FIELD_NAME: 'CYCLE_TIME',
    OLD_VALUE: '15',
    NEW_VALUE: '14',
    CHANGE_TYPE: 'UPDATE',
    CHANGED_BY: 'john.doe@example.com',
    CHANGE_DATE: '2023-05-21T13:25:00Z'
  },
  {
    AUDIT_ID: 10,
    TABLE_NAME: 'PRODUCT_MASTER',
    RECORD_ID: '1004',
    FIELD_NAME: 'PRICE',
    OLD_VALUE: '99.99',
    NEW_VALUE: '89.99',
    CHANGE_TYPE: 'UPDATE',
    CHANGED_BY: 'jane.smith@example.com',
    CHANGE_DATE: '2023-05-22T09:40:00Z'
  }
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    const tableName = searchParams.get('tableName') || '';
    const recordId = searchParams.get('recordId') || '';
    const changeType = searchParams.get('changeType') || '';
    const changedBy = searchParams.get('changedBy') || '';
    const startDate = searchParams.get('startDate') || '';
    const endDate = searchParams.get('endDate') || '';
    
    // Filter the mock data based on the search parameters
    let filteredData = [...mockAuditData];
    
    if (tableName) {
      filteredData = filteredData.filter(item => 
        item.TABLE_NAME.toLowerCase() === tableName.toLowerCase()
      );
    }
    
    if (recordId) {
      filteredData = filteredData.filter(item => 
        item.RECORD_ID.toString() === recordId
      );
    }
    
    if (changeType) {
      filteredData = filteredData.filter(item => 
        item.CHANGE_TYPE.toLowerCase() === changeType.toLowerCase()
      );
    }
    
    if (changedBy) {
      filteredData = filteredData.filter(item => 
        item.CHANGED_BY.toLowerCase().includes(changedBy.toLowerCase())
      );
    }
    
    if (startDate) {
      const start = new Date(startDate);
      filteredData = filteredData.filter(item => 
        new Date(item.CHANGE_DATE) >= start
      );
    }
    
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999); // Set to end of day
      filteredData = filteredData.filter(item => 
        new Date(item.CHANGE_DATE) <= end
      );
    }
    
    // Sort by change date (newest first)
    filteredData.sort((a, b) => 
      new Date(b.CHANGE_DATE).getTime() - new Date(a.CHANGE_DATE).getTime()
    );
    
    // Calculate pagination
    const totalRecords = filteredData.length;
    const totalPages = Math.ceil(totalRecords / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filteredData.slice(startIndex, endIndex);
    
    return NextResponse.json({ 
      success: true,
      data: paginatedData,
      totalRecords,
      totalPages,
      currentPage: page
    });
  } catch (error: any) {
    console.error('Error processing mock audit data:', error);
    
    return NextResponse.json({ 
      success: false,
      error: error.message,
      data: [],
      totalRecords: 0,
      totalPages: 0,
      currentPage: 1
    }, { status: 500 });
  }
}
