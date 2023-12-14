<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Analytic extends Model
{
  use HasFactory;

  protected $fillable = [
    'magazine_id',
    'views',
  ];

  public function magazine()
  {
    return $this->belongsTo(Magazine::class);
  }
}
