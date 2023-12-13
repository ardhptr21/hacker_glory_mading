<?php

namespace App\Repositories;

use App\Models\Category;

class CategoryRepository
{
  public function getAll(int $paginate, ?string $q = null, ?string $sort = 'desc')
  {
    return Category::filter($q, $sort)->paginate($paginate)->withQueryString();
  }
}
