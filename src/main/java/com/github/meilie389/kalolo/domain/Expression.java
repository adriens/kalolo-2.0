package com.github.meilie389.kalolo.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Expression.
 */
@Entity
@Table(name = "expression")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Expression implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "text")
    private String text;

    @Column(name = "points")
    private Integer points;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "expression_tags",
               joinColumns = @JoinColumn(name = "expression_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "tags_id", referencedColumnName = "id"))
    private Set<Tag> tags = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public Expression text(String text) {
        this.text = text;
        return this;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Integer getPoints() {
        return points;
    }

    public Expression points(Integer points) {
        this.points = points;
        return this;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public Expression tags(Set<Tag> tags) {
        this.tags = tags;
        return this;
    }

    public Expression addTags(Tag tag) {
        this.tags.add(tag);
        tag.getExps().add(this);
        return this;
    }

    public Expression removeTags(Tag tag) {
        this.tags.remove(tag);
        tag.getExps().remove(this);
        return this;
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Expression)) {
            return false;
        }
        return id != null && id.equals(((Expression) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Expression{" +
            "id=" + getId() +
            ", text='" + getText() + "'" +
            ", points=" + getPoints() +
            "}";
    }
}
