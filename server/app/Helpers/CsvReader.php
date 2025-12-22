<?php
//Névtér: Ennek a segítségével fogjuk elérni
namespace App\Helpers;

use Illuminate\Support\Facades\File; // Ha a File Facade-et akarod használni a natív PHP helyett

class CsvReader
{

    public static function csvToArray(string $fileName, string $delimiter = ';'): array
    {
        $filePath = database_path(path: $fileName);
        $data = [];

        if (!File::exists($filePath)) {
            return $data;
        }

        if (($handle = fopen($filePath, 'r')) !== false) {
            $header = fgetcsv($handle, 0, $delimiter);

            while (($cols = fgetcsv($handle, 0, $delimiter)) !== false) {
                if ($header && count($header) === count($cols)) {
                    $data[] = array_combine($header, $cols);
                }
            }
            
            fclose($handle);
        }

        return $data;
    }
}