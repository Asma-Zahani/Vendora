<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPreference extends Model
{
    /** @use HasFactory<\Database\Factories\UserPreferencesFactory> */
    use HasFactory;

    protected $table = 'user_preferences';
    protected $primaryKey = 'preference_id';
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'preferred_categorie_ids',
        'preferred_marque_ids',
    ];

    protected $casts = [
        'preferred_categorie_ids' => 'array',
        'preferred_marque_ids' => 'array',
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
