<?php

namespace App\Http\Controllers;

use App\Models\Student  as CurrentModel;
use App\Http\Requests\StoreStudentRequest  as StoreCurrentModelRequest;
use App\Http\Requests\UpdateStudentRequest as UpdateCurrentModelRequest;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class StudentController extends Controller
{
    use AuthorizesRequests;

    public function indexSturdentsBySchoolclassId(int $schoolclassId)
    {
        return $this->apiResponse(
            function () {
                return CurrentModel::all();
            }
        );
    }


    //region crud
    public function index()
    {
        return $this->apiResponse(
            function () {
                return CurrentModel::all();
            }
        );
    }

    public function store(StoreCurrentModelRequest $request)
    {
        return $this->apiResponse(
            function () use ($request) {
                return CurrentModel::create($request->validated());
            }
        );
    }

    public function show(int $id)
    {
        return $this->apiResponse(function () use ($id) {
            return CurrentModel::findOrFail($id);
        });
    }

    public function update(UpdateCurrentModelRequest $request, int $id)
    {
        return $this->apiResponse(function () use ($request, $id) {
            $row = CurrentModel::findOrFail($id);
            $row->update($request->validated());
            return $row;
        });
    }

    public function destroy(int $id)
    {
        return $this->apiResponse(function () use ($id) {
            CurrentModel::findOrFail($id)->delete();
            return ['id' => $id];
        });
    }

    //endregion
}
