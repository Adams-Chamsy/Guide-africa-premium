package com.guideafrica.premium.model;

import javax.persistence.Embeddable;

@Embeddable
public class GpsCoordinates {

    private Double latitude;
    private Double longitude;

    public GpsCoordinates() {}

    public GpsCoordinates(Double latitude, Double longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }
}
