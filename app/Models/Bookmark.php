<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bookmark extends Model
{
  use HasFactory;

  protected $fillable = ['magazine_id', 'user_id'];

  public function user()
  {
    return $this->belongsTo(User::class);
  }

  public function magazine()
  {
    return $this->belongsTo(Magazine::class);
  }
}
