﻿define([
    'models/LeadsModel'
],
    function (LeadsModel) {
        var LeadsCollection = Backbone.Collection.extend({
            model: LeadsModel,
            url: "/Leads/",
            page: null,
            namberToShow: null,
            contentType: null,

            initialize: function (options) {
                this.startTime = new Date();

                var that = this;
                this.namberToShow = options.count;
                this.viewType = options.viewType;
                this.contentType = options.contentType;
                this.count = options.count;
                this.page = options.page || 1;
                if (options && options.viewType) {
                    this.url += options.viewType;
                    //delete options.viewType;
                }

                this.fetch({
                    data: options,
                    reset: true,
                    success: function() {
                        that.page++;
                    },
                    error: function (models, xhr) {
                        if (xhr.status == 401) Backbone.history.navigate('#login', { trigger: true });
                    }
                });
            },

            showMore: function (options) {
                var that = this;

                var filterObject = {};
                if (options) {
                    for (var i in options) {
                        filterObject[i] = options[i];
                    }
                }
                if (options && options.page) {
                    this.page = options.page;
                }
                if (options && options.count) {
                    this.namberToShow = options.count;
                }
                filterObject['page'] = this.page;
                filterObject['count'] = this.namberToShow;
                filterObject['filter'] = (options) ? options.filter : {};
                filterObject['contentType'] = (options && options.contentType) ? options.contentType: this.contentType;
                this.fetch({
                    data: filterObject,
                    waite: true,
                    success: function (models) {
                        console.log('Fetch from Server --->' + models.length);
                        that.page ++;
                        that.trigger('showmore', models);
                    },
                    error: function() {
                        alert('Some Error');
                    }
                });
            },

            parse: true,
            parse: function (response) {
                return response.data;
            }
        });

        return LeadsCollection;
    });
