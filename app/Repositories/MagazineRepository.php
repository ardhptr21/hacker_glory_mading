<?php

namespace App\Repositories;

use App\Models\Magazine;

class MagazineRepository
{
  public function allPublishedWithFilter(?string $q, ?string $sort = 'desc')
  {
    return Magazine::with(['category:id,name,slug', 'author:id,username'])
      ->published()
      ->filter($q, $sort)
      ->get();
  }
}
