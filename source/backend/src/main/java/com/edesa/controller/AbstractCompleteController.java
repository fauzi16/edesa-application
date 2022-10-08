package com.edesa.controller;


import java.io.Serializable;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.server.ResponseStatusException;

import com.edesa.service.AbstractCompleteService;

public class AbstractCompleteController<T, ID extends Serializable, S extends AbstractCompleteService<T, ID, ?>> extends CommonController {

    public S service;

    final Class<T> entityClazz;
    final Class<ID> classId;

    

    protected AbstractCompleteController(S service, Class<T> entityClass, Class<ID> idClass) {
        this.service = service;
        this.entityClazz = entityClass;
        this.classId = idClass;
    }

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<T> getAll(@RequestHeader Map<String, String> headers) {
        try {
            return service.findAll();
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error fetch entity", e);
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public T getEntity(@PathVariable("id") ID id) {
        try {
            return (T) service.getById(id);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error Save entity", e);
        }
    }

    @RequestMapping(value = "find-pageddata-by-sample", method = RequestMethod.POST)
    public List<T> findPagedDataBySample(@RequestBody T sample, Integer pageNo, Integer pageSize) {
        List<T> result = service.findPagedDataBySample(sample, pageNo, pageSize);
        return result;
    }

    @RequestMapping(value = "find-alldata-by-sample", method = RequestMethod.POST)
    public List<T> findAllDataBySample(@RequestBody T sample) {
        List<T> result = service.findAllDataBySample(sample);
        return result;
    }

    @RequestMapping(value = "count-by-sample", method = RequestMethod.POST)
    public Long countBySample(@RequestBody T sample) {
        Long result = service.countBySample(sample);
        return result;
    }

    

}