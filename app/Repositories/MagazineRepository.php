<?php

namespace App\Repositories;

use App\Models\Magazine;

class MagazineRepository
{
  public function allPublishedWithFilter(?string $q, ?string $sort = 'desc')
  {
    return Magazine::with(['category:id,name,slug', 'author:id,username'])
      ->whereDate('published_at', '<=', now())
      ->when($q, function ($query, $q) {
        $query
          ->where('title', 'like', '%' . $q . '%')
          ->orWhere('description', 'like', '%' . $q . '%');
      })
      ->orderBy('published_at', $sort)
      ->get();
  }
}
