<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Builder;
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

  public function scopePublished(Builder $query)
  {
    $query->where('published_at', '<=', now());
  }

  public function scopeFilter(Builder $query, ?string $q, ?string $sort = 'desc')
  {
    $query
      ->when($q, function ($query, $q) {
        $query
          ->where('title', 'like', '%' . $q . '%')
          ->orWhere('description', 'like', '%' . $q . '%');
      })
      ->orderBy('published_at', $sort)
      ->orderBy('created_at', $sort);
  }
}
