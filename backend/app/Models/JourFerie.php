<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JourFerie extends Model
{

    use HasFactory;

    protected $primaryKey = 'jour_ferie_id';
    public $timestamps = false;

    protected $fillable = [
        'title',
        'start',
        'end',
    ];

    public function retraitDrive()
    {
        return $this->belongsTo(CommandeRetraitDrive::class, 'jour_ferie_id');
    }
}