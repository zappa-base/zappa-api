import 'dotenv/config';
import fs from 'fs';
import { Connection } from 'typeorm';

import { createDBConnection } from './createDBConnection';

async function seedRunner(fileName: string, connection: Connection) {
  let seedModule;
  try {
    seedModule = await import(`./seeds/${fileName}`);
  } catch (error) {
    const files = fs
      .readdirSync(`${__dirname}/seeds`)
      .filter((file) => file.slice(-3) === '.ts');

    console.error('');
    console.error('--- Invalid File Name ---');
    console.error('');
    console.error('Valid Filenames are:');
    files.forEach((file) => {
      console.error(`- ${file}`);
    });
    console.error('');

    process.exit(1);
  }

  if (seedModule.default) {
    try {
      return await seedModule.default(connection);
    } catch (error) {
      console.error(error);

      process.exit(0);
    }
  }
}

async function seedManager() {
  const args = process.argv.slice(2);

  const connection = await createDBConnection({
    logging: false,
  });

  if (args[0] === '--all' || args[0] === '-a') {
    const files = fs
      .readdirSync(`${__dirname}/seeds`)
      .filter((file) => file.slice(-3) === '.ts');

    const resultPromises = files.map(async (file) => {
      await seedRunner(file, connection);
    });

    await Promise.all(resultPromises);
  } else if ((args[0] === '--file' || args[0] === '-f') && args[1]) {
    const file = args[1];

    await seedRunner(file, connection);
  } else {
    console.info('');
    console.info('------ Invalid Arguments -------');
    console.info('');
    console.info('Type -h or --help to get this prompt:');
    console.info('');
    console.info('--file, -f {fileName}: run seed with matching filename.');
    console.info('--all, -a: run all seeds');
    console.info('--------------------------------');
  }

  process.exit(0);
}

seedManager();
