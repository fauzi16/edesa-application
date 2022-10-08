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

import com.edesa.model.BaseModel;
import com.edesa.service.AbstractService;

public class AbstractController<T, ID extends Serializable, S extends AbstractService<T, ID, ?>> extends CommonController {

    public S service;

    final Class<T> entityClazz;
    final Class<ID> classId;

    

    protected AbstractController(S service, Class<T> entityClass, Class<ID> idClass) {
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

    @RequestMapping(method = RequestMethod.POST)
    public T saveEntity(@RequestBody T postPayload, @RequestHeader Map<String, String> headers) {
        T o = null;
        try {
            o = postPayload;
            o = service.save((T) o);
            return o;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error Save entity", e);
        }

    }

    @RequestMapping(method = RequestMethod.PUT)
    public T updateEntity(@RequestBody T postPayload, @RequestHeader Map<String, String> headers) {
        T o = null;
        try {
            o = postPayload;
            o = service.update(o);
            return o;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error Save entity", e);
        }

    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public boolean deleteEntity(@PathVariable ID id) {
        try {
            T o = (T) getEntity(id);
            if (o == null) {
                return false;
            } else {
                service.delete(o);
                return true;
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error Delete entity", e);
        }
    }

    @RequestMapping(value = "softDelete/{id}", method = RequestMethod.DELETE)
    public void softDeleteEntity(@PathVariable ID id) {
        try {
            T o = (T) getEntity(id);
            if (o instanceof BaseModel) {
                BaseModel model = (BaseModel) o;
                model = (BaseModel) service.getById((ID) model.getId());
                model.setDeleted(true);
                service.update(o);
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error Delete entity", e);
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