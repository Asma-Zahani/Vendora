<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PeriodeHoraire extends Model
{

    use HasFactory;

    protected $primaryKey = 'periode_horaire_id';
    public $timestamps = false;
    
    protected $fillable = [
        'heure_debut',
        'heure_fin',
        'horaire_id'
    ];
    
    public function horaire()
    {
        return $this->belongsTo(Horaire::class, 'horaire_id', 'horaire_id');
    }
}