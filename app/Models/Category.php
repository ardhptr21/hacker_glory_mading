<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
  use HasFactory, Sluggable;

  protected $fillable = [
    'name'
  ];

  public function sluggable(): array
  {
    return [
      'slug' => [
        'source' => 'name',
        'onUpdate' => true
      ]
    ];
  }

  public function magazines(): HasMany
  {
    return $this->hasMany(Magazine::class);
  }
}
