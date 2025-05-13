<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PeriodeHoraire extends Model
{
    protected $table = 'periode_horaires';
    public $timestamps = false;
    
    protected $fillable = ['horaire_id', 'periode_id'];
}