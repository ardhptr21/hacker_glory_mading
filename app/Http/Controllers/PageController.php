<?php

namespace App\Http\Controllers;

use App\Models\Magazine;
use App\Repositories\MagazineRepository;
use Illuminate\Http\Request;

class PageController extends Controller
{
  public function home(Request $request, MagazineRepository $magazineRepository)
  {
    $q = $request->query('q');
    $sort = $request->query('sort', 'desc');
    $magazines = $magazineRepository->allPublishedWithFilter($q, $sort);
    // dd($magazines);

    return inertia('home', compact('magazines'));
  }
}
