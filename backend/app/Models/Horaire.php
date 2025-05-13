<?php

namespace App\Models;

use App\Enums\JourEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Horaire extends Model
{

    use HasFactory;

    protected $primaryKey = 'horaire_id';
    public $timestamps = false;
    
    protected $fillable = [
        'jour',
        'ouvert',
        'drive_id'
    ];

    protected $casts = [
        'jour' => JourEnum::class
    ];

    public function drive()
    {
        return $this->belongsTo(Drive::class, 'drive_id', 'drive_id');
    }

    public function periodes()
    {
        return $this->belongsToMany(Periode::class,'periode_horaires','horaire_id','periode_id');
    }

}