<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Analytic extends Model
{
  use HasFactory;

  protected $fillable = [
    'magazine_id',
    'views',
  ];

  protected $appends = ['display_date'];

  public function magazine()
  {
    return $this->belongsTo(Magazine::class);
  }

  public function displayDate(): Attribute
  {
    return Attribute::make(
      get: fn ($value) => Carbon::parse($value)->translatedFormat('d M'),
    );
  }

  public function scopeByRange(Builder $query, string $range)
  {
    switch ($range) {
      case 'today':
        return $query->whereDate('created_at', now());
      case 'yesterday':
        return $query->whereDate('created_at', now()->subDay());
      case '7d':
        return $query->whereBetween('created_at', [now()->subDays(7), now()]);
      case '14d':
        return $query->whereBetween('created_at', [now()->subDays(14), now()]);
      case '1m':
        return $query->whereBetween('created_at', [now()->subMonth(), now()]);
      case '3m':
        return $query->whereBetween('created_at', [now()->subMonths(3), now()]);
      case '6m':
        return $query->whereBetween('created_at', [now()->subMonths(6), now()]);
      case '1y':
        return $query->whereBetween('created_at', [now()->subYear(), now()]);
      default:
        return $query->whereBetween('created_at', [now()->subDays(7), now()]);
    }
  }
}
