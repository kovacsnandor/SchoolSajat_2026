<?php

namespace App\Http\Controllers;

use App\Models\Playingsport;
use App\Http\Requests\StorePlayingsportRequest;
use App\Http\Requests\UpdatePlayingsportRequest;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;

class PlayingsportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        return $this->apiResponse(
            function () {
                return Playingsport::all();
            }
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePlayingsportRequest $request)
    {
        return $this->apiResponse(
            function () use ($request) {
                return Playingsport::create($request->validated());
            }
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        return $this->apiResponse(function () use ($id) {
            return Playingsport::findOrFail($id);
        });
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePlayingsportRequest $request, Playingsport $playingsport, int $id)
    {
        return $this->apiResponse(function () use ($request, $id) {
            $row = Playingsport::findOrFail($id);
            $row->update($request->validated());
            return $row;
        });
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        return $this->apiResponse(function () use ($id) {
            Playingsport::findOrFail($id)->delete();
            return ['id' => $id];
        });
    }
}
