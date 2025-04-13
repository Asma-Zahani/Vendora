<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPreferences extends Model
{
    /** @use HasFactory<\Database\Factories\UserPreferencesFactory> */
    use HasFactory;

    protected $table = 'user_preferences';
    protected $primaryKey = 'preference_id';
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'preferred_category_ids',
        'preferred_brand_ids',
    ];

    protected $casts = [
        'preferred_category_ids' => 'array',
        'preferred_brand_ids' => 'array',
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
