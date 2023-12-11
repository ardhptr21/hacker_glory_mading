<?php

namespace App\Traits;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

trait UploadFile
{
  public function upload(UploadedFile $file, $identifier = '', $dir = '', $old = null)
  {
    if ($old) {
      $this->delete($old);
    }
    $path = $identifier . '-' . floor(microtime(true) * 1000) . '-' . $file->getClientOriginalName();

    $path = 'uploads/' . $dir . '/' . $path;
    Storage::disk('public')->put($path, $file);
    return $path;
  }

  public function delete($file)
  {
    Storage::delete($file);
  }
}
