<?php

namespace Database\Seeders;

use App\Helpers\CsvReader;
use App\Models\Schoolclass;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SchoolclassSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $fileName = 'csv/schoolclasses.csv';
        $delimeter = ';';
        $data = CsvReader::csvToArray($fileName,$delimeter);
        Schoolclass::factory()->createMany($data);

    }
}
