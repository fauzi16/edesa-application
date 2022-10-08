package com.edesa.service;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

public abstract class AbstractCompleteService<T, ID extends Serializable, D extends JpaRepository<T, ID>> {

    protected final Logger logger = LoggerFactory.getLogger(getClass());

    protected D dao;

    public D getDao() {
        return dao;
    }

    public void setDao(D dao) {
        this.dao = dao;
    }

    protected AbstractCompleteService(D dao) {
        this.dao = dao;
    }

    @Transactional
    public Long getAllCount() {
        this.logger.debug("get all entity", this.getClass(), this.getClass().getSimpleName());
        return dao.count();
    }

    public T getById(ID id) {
        Optional<T> optional = dao.findById(id);
        T o = optional.get();
        return (o);
    }

    public List<T> findAll() {
        return dao.findAll();
    }

    public List<T> findPagedData(Integer pageNo, Integer pageSize, String sortBy) {
        Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by(sortBy));

        Page<T> pagedResult = dao.findAll(paging);

        if (pagedResult.hasContent()) {
            return pagedResult.getContent();
        } else {
            return new ArrayList<T>();
        }
    }

    public List<T> findPagedData(Integer pageNo, Integer pageSize) {
        Pageable paging = PageRequest.of(pageNo, pageSize);

        Page<T> pagedResult = dao.findAll(paging);

        if (pagedResult.hasContent()) {
            return pagedResult.getContent();
        } else {
            return new ArrayList<T>();
        }
    }

    /**
     * 
     * @param sample
     * @param pageNo
     * @param pageSize
     * @return
     */
    public List<T> findPagedDataBySample(T sample, Integer pageNo, Integer pageSize) {
        Pageable paging = PageRequest.of(pageNo, pageSize);

        Example<T> example = Example.of(sample); 
        return dao.findAll(example, paging).getContent();
    }

    /**
     * 
     * @param sample
     * @return
     */
    public List<T> findAllDataBySample(T sample) {
        Example<T> example = Example.of(sample); 
        return dao.findAll(example);
    }

    /**
     * 
     * @param sample
     * @param pageNo
     * @param pageSize
     * @return
     */
    public Long countBySample(T sample) {
        Example<T> example = Example.of(sample); 
        return dao.count(example);
    }

}
