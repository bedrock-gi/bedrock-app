const fs = require('fs');
const path = require('path');
const { getDMMF } = require('@prisma/sdk');

// Function to convert Prisma schema to JSON
async function convertPrismaSchemaToJSON(schemaFilePath, outputFilePath) {
    try {
        const schema = fs.readFileSync(schemaFilePath, 'utf-8');

        // Parse the Prisma schema to DMMF (Data Model Meta Format)
        const dmmf = await getDMMF({ datamodel: schema });

        // Save the output as JSON
        const jsonOutput = JSON.stringify(dmmf, null, 2);
        fs.writeFileSync(outputFilePath, jsonOutput);

        console.log(`Prisma schema successfully converted to JSON at: ${outputFilePath}`);
    } catch (error) {
        console.error('Error converting Prisma schema to JSON:', error);
    }
}

// Example usage:
const schemaFilePath = path.resolve(__dirname, '../prisma/schema.prisma');  // Your Prisma schema file path
const outputFilePath = path.resolve(__dirname, 'prismaSchema.json');    // Output JSON file path

convertPrismaSchemaToJSON(schemaFilePath, outputFilePath);
