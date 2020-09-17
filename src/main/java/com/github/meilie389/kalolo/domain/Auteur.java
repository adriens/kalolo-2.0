package com.github.meilie389.kalolo.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Auteur.
 */
@Entity
@Table(name = "auteur")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Auteur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "cle_auteur")
    private String cleAuteur;

    @Column(name = "url_web")
    private String urlWeb;

    @Column(name = "url_fb")
    private String urlFb;

    @Column(name = "url_insta")
    private String urlInsta;

    @Column(name = "url_yt")
    private String urlYt;

    @Column(name = "url_twit")
    private String urlTwit;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public Auteur nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getCleAuteur() {
        return cleAuteur;
    }

    public Auteur cleAuteur(String cleAuteur) {
        this.cleAuteur = cleAuteur;
        return this;
    }

    public void setCleAuteur(String cleAuteur) {
        this.cleAuteur = cleAuteur;
    }

    public String getUrlWeb() {
        return urlWeb;
    }

    public Auteur urlWeb(String urlWeb) {
        this.urlWeb = urlWeb;
        return this;
    }

    public void setUrlWeb(String urlWeb) {
        this.urlWeb = urlWeb;
    }

    public String getUrlFb() {
        return urlFb;
    }

    public Auteur urlFb(String urlFb) {
        this.urlFb = urlFb;
        return this;
    }

    public void setUrlFb(String urlFb) {
        this.urlFb = urlFb;
    }

    public String getUrlInsta() {
        return urlInsta;
    }

    public Auteur urlInsta(String urlInsta) {
        this.urlInsta = urlInsta;
        return this;
    }

    public void setUrlInsta(String urlInsta) {
        this.urlInsta = urlInsta;
    }

    public String getUrlYt() {
        return urlYt;
    }

    public Auteur urlYt(String urlYt) {
        this.urlYt = urlYt;
        return this;
    }

    public void setUrlYt(String urlYt) {
        this.urlYt = urlYt;
    }

    public String getUrlTwit() {
        return urlTwit;
    }

    public Auteur urlTwit(String urlTwit) {
        this.urlTwit = urlTwit;
        return this;
    }

    public void setUrlTwit(String urlTwit) {
        this.urlTwit = urlTwit;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Auteur)) {
            return false;
        }
        return id != null && id.equals(((Auteur) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Auteur{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", cleAuteur='" + getCleAuteur() + "'" +
            ", urlWeb='" + getUrlWeb() + "'" +
            ", urlFb='" + getUrlFb() + "'" +
            ", urlInsta='" + getUrlInsta() + "'" +
            ", urlYt='" + getUrlYt() + "'" +
            ", urlTwit='" + getUrlTwit() + "'" +
            "}";
    }
}
