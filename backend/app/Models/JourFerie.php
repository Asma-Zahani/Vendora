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
        'drive_id'
    ];

    public function drive()
    {
        return $this->belongsTo(Drive::class, 'drive_id', 'drive_id');
    }
}