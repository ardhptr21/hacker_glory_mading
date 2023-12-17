<?php

namespace App\Http\Controllers;

use App\Repositories\MagazineRepository;
use Illuminate\Http\Request;

class PageController extends Controller
{
  public function home(Request $request, MagazineRepository $magazineRepository)
  {
    [$important_magazines, $latest_magazines] = $magazineRepository->getImportantAndLatest();

    return inertia('home', compact('important_magazines', 'latest_magazines'));
  }
}
