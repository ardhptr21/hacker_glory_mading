<?php

namespace App\Models;

use Carbon\Carbon;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
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
    'approved',
    'important'
  ];

  protected $appends = ['is_published'];

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

  public function bookmarks()
  {
    return $this->hasMany(Bookmark::class);
  }

  public function analytics()
  {
    return $this->hasMany(Analytic::class);
  }

  public function publishedAt(): Attribute
  {
    return Attribute::make(
      get: fn ($value) => Carbon::parse($value)->translatedFormat('d F, Y H:i'),
    );
  }


  protected function isPublished(): Attribute
  {
    return Attribute::make(
      get: fn ($value) => $value <= now(),
    );
  }

  public function scopeImportant(Builder $query)
  {
    $query->where('important', true);
  }

  public function scopePublished(Builder $query)
  {
    $query->where('published_at', '<=', now());
  }

  public function scopeApproved(Builder $query)
  {
    $query->where('approved', true);
  }

  public function scopeNotApproved(Builder $query)
  {
    $query->where('approved', false);
  }

  public function scopeUnpublished(Builder $query)
  {
    $query->where('published_at', '>', now());
  }

  public function scopeFilter(Builder $query, ?string $q = null, ?string $published = null, ?string $approved = null, ?string $important = null, ?string $sort = 'desc')
  {
    $query
      ->when($q, function ($query, $q) {
        $query
          ->where('title', 'like', '%' . $q . '%')
          ->orWhere('description', 'like', '%' . $q . '%');
      })
      ->when($published, function ($query, $published) {
        if ($published === 'yes') {
          $query->published();
        } else if ($published === 'no') {
          $query->unpublished();
        }
      })
      ->when($important, function ($query, $important) {
        if ($important === 'yes') {
          $query->important();
        } else if ($important === 'no') {
          $query->where('important', false);
        }
      })
      ->when($approved, function ($query, $approved) {
        if ($approved === 'yes') {
          $query->approved();
        } else if ($approved === 'no') {
          $query->where('approved', false);
        }
      })
      ->orderBy('published_at', $sort)
      ->orderBy('created_at', $sort);
  }
}
