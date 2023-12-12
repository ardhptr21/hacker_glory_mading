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
    $filename = $identifier . '-' . floor(microtime(true) * 1000) . '-' . $file->getClientOriginalName();
    $destination = 'uploads/';
    if ($dir) {
      $destination .= $dir . '/';
    }

    Storage::disk('public')->putFileAs($destination, $file, $filename);
    return $destination . $filename;
  }

  public function delete($path)
  {
    Storage::disk('public')->delete($path);
  }
}
