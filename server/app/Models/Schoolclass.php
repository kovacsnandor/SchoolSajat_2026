<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schoolclass extends Model
{
    /** @use HasFactory<\Database\Factories\SchoolclassFactory> */
    use HasFactory;


// Schoolclass.php
public function students()
{
    return $this->hasMany(Student::class, 'schoolclassId');
}

    
    protected $fillable = [
        'osztalyNev'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
