<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
  use HasApiTokens, HasFactory, Notifiable;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'name',
    'username',
    'email',
    'nip',
    'nis',
    'password',
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var array<int, string>
   */
  protected $hidden = [
    'password',
    'remember_token',
  ];

  /**
   * The attributes that should be cast.
   *
   * @var array<string, string>
   */
  protected $casts = [
    'email_verified_at' => 'datetime',
    'password' => 'hashed',
  ];

  public function hasRole(...$roles): bool
  {
    return $roles
      ? in_array($this->role, $roles)
      : false;
  }

  public function scopeFilter(Builder $query, ?string $q = null, ?string $role = null, ?string $sort = 'desc')
  {
    $query
      ->when($q, function ($query, $q) {
        $query
          ->where('name', 'like', '%' . $q . '%')
          ->orWhere('username', 'like', '%' . $q . '%')
          ->orWhere('email', 'like', '%' . $q . '%');
      })
      ->when($role, function ($query, $role) {
        $query->where('role', $role);
      })
      ->orderBy('created_at', $sort);
  }
}
