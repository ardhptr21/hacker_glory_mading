<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Magazine extends Model
{
  use HasFactory, Sluggable;

  protected $fillable = [
    'title',
    'description',
    'thumbnail',
    'with_article',
    'article',
    'category_id',
    'author_id',
    'published_at',
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

  public function category(): BelongsTo
  {
    return $this->belongsTo(Category::class);
  }

  public function author(): BelongsTo
  {
    return $this->belongsTo(User::class, 'author_id');
  }
}
