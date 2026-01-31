<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Student extends Model
{
    /** @use HasFactory<\Database\Factories\StudentsFactory> */
    use HasFactory;

    //Fontos!!! Ez engedi meg a camelCase neveket
    public static $snakeAttributes = false;


    //A Carbon egy Laravel csomag, ami rengteg dátummal kapcsolatos
    //segédfüggvényt atartalmaz, például kiszámolja precizen az életkort
    public function eletkor(): Attribute
    {
        return Attribute::make(
            get: function () {
            // Segítünk az IDE-nek: "Hé, ez itt egy Carbon dátum!"
                /** @var \Illuminate\Support\Carbon|null $date */
                $date = $this->szulDatum;
                return $date?->age;
            }
        );
    }
    

    //Fontos!!! nem lehet a függvény neve camelCase formátumú 
    public function nemeString(): Attribute
    {
        return Attribute::make(
            get: function () {
                return $this->neme ? 'fiú' : 'lány';
            }
        );
    }



    // public function osztaly(): Attribute
    // {
    //     return Attribute::make(
    //         get: function () {
    //             return $this->schoolclass?->osztalyNev;
    //         }
    //     );
    // }


    public function schoolclass()
    {
        //a Student táblában van egy schoolclassId, idegen kulcs 
        //vélhetően a schoolclasses tábla id oszlopára mutat
        //Ez a két tábla közötti kapcsolat
        return $this->belongsTo(
            Schoolclass::class,
            'schoolclassId'
        );
    }

    protected $appends = ['eletkor', 'nemeString'];
    // protected $appends = ['eletkor', 'nemestring'];
    // protected $appends = ['eletkor', 'osztaly'];

    protected $fillable = [
        'diakNev',
        'schoolclassId',
        'neme',
        'iranyitoszam',
        'lakHelyseg',
        'lakCim',
        'szulHelyseg',
        'szulDatum',
        'igazolvanyszam',
        'atlag',
        'osztondij',
    ];
    protected $hidden = [
        'schoolclass',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'szulDatum' => 'date:Y-m-d',
        'atlag' => 'float',
        'osztondij' => 'float',
    ];
}
