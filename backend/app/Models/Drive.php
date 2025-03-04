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
        'nom',
        'adresse',
        'region',
        'ville',
        'status'
    ];
}
