<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository
{
  public function getAll(int $paginate, ?string $q = null, ?string $role = null, ?string $sort = 'desc')
  {
    return User::filter($q, $role, $sort)->paginate($paginate)->withQueryString();
  }
}
