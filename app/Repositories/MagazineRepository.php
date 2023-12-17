<?php

namespace App\Repositories;

use App\Models\Magazine;

class MagazineRepository
{
  public function getAll(int $paginate, ?string $q = null, ?string $published = null, ?string $approved = null, ?string $important = null, ?string $sort = 'desc')
  {
    return Magazine::with(['category:id,name,slug', 'author:id,username'])
      ->filter($q, $published, $approved, $important, $sort)
      ->paginate($paginate)
      ->withQueryString();
  }


  public function getAllByAuthor(int $paginate, int $authorId, ?string $q = null, ?string $published = null, ?string $approved = null, ?string $important = null, ?string $sort = 'desc')
  {
    return Magazine::with(['category:id,name,slug', 'author:id,username'])
      ->where('author_id', $authorId)
      ->filter($q, $published, $approved, $important, $sort)
      ->paginate($paginate)
      ->withQueryString();
  }

  public function getAllNotApproved(int $paginate, ?string $q = null, ?string $sort = 'desc')
  {
    return Magazine::with(['category:id,name,slug', 'author:id,username'])
      ->notApproved()
      ->filter($q, null, null, null, $sort)
      ->paginate($paginate)
      ->withQueryString();
  }

  public function getAllPublishedAndApproved(?string $q, ?string $sort = 'desc')
  {
    return Magazine::with(['category:id,name,slug', 'author:id,username'])
      ->approved()
      ->published()
      ->filter($q, null, null, null, $sort)
      ->paginate(10);
  }

  public function getImportantAndLatest()
  {
    $important_magazines = Magazine::with(['category:id,name,slug', 'author:id,username'])
      ->important()
      ->published()
      ->orderBy('published_at', 'desc')
      ->orderBy('created_at', 'desc')
      ->get();

    $latest_magazines = Magazine::with(['category:id,name,slug', 'author:id,username'])
      ->where('important', false)
      ->published()
      ->orderBy('published_at', 'desc')
      ->orderBy('created_at', 'desc')
      ->take(6)
      ->get();

    return [$important_magazines, $latest_magazines];
  }
}
