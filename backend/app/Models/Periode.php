<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Periode extends Model
{

    use HasFactory;

    protected $primaryKey = 'periode_id';
    public $timestamps = false;
    
    protected $fillable = [
        'heureDebut',
        'heureFin'
    ];

    public function horaires()
    {
        return $this->belongsToMany(Horaire::class,'periode_horaires','periode_id','horaire_id');
    }
}