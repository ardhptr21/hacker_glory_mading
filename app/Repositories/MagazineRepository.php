<?php

namespace App\Repositories;

use App\Models\Magazine;

class MagazineRepository
{
  public function getAll(int $paginate, ?string $q, ?string $published, ?string $approved, ?string $sort = 'desc')
  {
    return Magazine::with(['category:id,name,slug', 'author:id,username'])
      ->filter($q, $published, $approved, $sort)
      ->paginate($paginate)
      ->withQueryString();
  }

  public function allPublishedWithFilter(?string $q, ?string $sort = 'desc')
  {
    return Magazine::with(['category:id,name,slug', 'author:id,username'])
      ->published()
      ->filter($q, $sort)
      ->get();
  }
}
