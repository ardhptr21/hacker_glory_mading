<?php

namespace App\Repositories;

use App\Models\Magazine;

class MagazineRepository
{
  public function getAllByAuthor(int $paginate, int $authorId, ?string $q = null, ?string $published = null, ?string $approved = null, ?string $sort = 'desc')
  {
    return Magazine::with(['category:id,name,slug', 'author:id,username'])
      ->where('author_id', $authorId)
      ->filter($q, $published, $approved, $sort)
      ->paginate($paginate)
      ->withQueryString();
  }

  public function getAllNotApproved(int $paginate, ?string $q = null, ?string $sort = 'desc')
  {
    return Magazine::with(['category:id,name,slug', 'author:id,username'])
      ->notApproved()
      ->filter($q, $sort)
      ->paginate($paginate)
      ->withQueryString();
  }

  public function getAllPublishedAndApproved(?string $q, ?string $sort = 'desc')
  {
    return Magazine::with(['category:id,name,slug', 'author:id,username'])
      ->approved()
      ->published()
      ->filter($q, $sort)
      ->get();
  }
}
