<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Magazine extends Model
{
  use HasFactory, Sluggable;

  protected $fillable = [
    'title',
    'description',
    'thumbnail',
    'with_article',
    'article',
  ];

  public function sluggable(): array
  {
    return [
      'slug' => [
        'source' => 'title',
        'onUpdate' => true,
      ],
    ];
  }
}
