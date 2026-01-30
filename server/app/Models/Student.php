<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Student extends Model
{
    /** @use HasFactory<\Database\Factories\StudentsFactory> */
    use HasFactory;


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

    // public function getOsztalyNevAttribute()
    // {
    //     return $this->schoolclass?->osztalyNev;
    // }


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

    protected $appends = ['eletkor'];
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
        'szulDatum' => 'date',
        'atlag' => 'float',
        'osztondij' => 'float',
    ];
}
