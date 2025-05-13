<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Drive extends Model
{
    use HasFactory;

    protected $table = 'drives';
    protected $primaryKey = 'drive_id';

    protected $fillable = [
        'responsable_id',
        'nom',
        'adresse',
        'region',
        'ville',
        'status'
    ];

    public function commandesRetraitDrive()
    {
        return $this->hasMany(CommandeRetraitDrive::class, 'drive_id', 'drive_id');
    }

    public function responsable()
    {
        return $this->belongsTo(User::class, 'responsable_id');
    }

    public function horaires()
    {
        return $this->hasMany(Horaire::class, 'drive_id', 'drive_id');
    }

    public function jourFeries()
    {
        return $this->hasMany(JourFerie::class, 'drive_id', 'drive_id');
    }
}
