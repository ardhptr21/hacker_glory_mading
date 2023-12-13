<?php

namespace App\Http\Controllers;

use App\Models\Magazine;

class MagazineController extends Controller
{
  public function view(Magazine $magazine)
  {
    $magazine->load('category', 'author');
    return inertia('mading/view', compact('magazine'));
  }
}
