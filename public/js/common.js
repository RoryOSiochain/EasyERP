﻿define(
    function () {
        var toObject = function (_id, collection) {
            var _tempObject = null;
            if (_id && collection) {
                _tempObject = (collection.get(_id)) ? collection.get(_id).toJSON() : null;
            }
            return _tempObject;
        };

        var utcDateToLocaleDate = function(utcDateString){
            if(utcDateString){
                //check if it is a correct utc date
                if(utcDateString.indexOf("T") == -1 || utcDateString.indexOf("Z") == -1)
                    throw new Error("UTC date parse error: input date was not in the correct format. -> Common.js");
                var fixedDate = utcDateString.replace('T',' ').replace('Z','').concat(' UTC');
                return dateFormat(new Date(fixedDate), "dd-mm-yyyy hh:mm");
            }
            return "";

        }

        var contentHolderHeightFixer = function () {
            $(window).ready(function () {
                var h = $(window).height();
                var hFixed = h - 101;
                $('#content-holder').css('min-height', hFixed + 'px');

            });
            jQuery(window).resize(function () {
                var h = $(window).height();
                var hFixed = h - 100;
                $('#content-holder').css('min-height', hFixed + 'px');
            });
        }

        var ISODateToDate = function (ISODate) {
            var date = ISODate.split('T')[0];
            return date;
        };

        var hexToRgb = function (hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        };

        var deleteEvent = function (e, that) {
            e.preventDefault();
            var answer = confirm("Realy DELETE item ?!");
            if (answer == true) {
                that.trigger('deleteEvent');
            }
        };

        var canvasDrawing = function (options, context) {
            var canvas = (options.canvas) ? options.canvas : context.$('#avatar')[0];
            var model = (options.model) ? options.model : {
                model: {
                    imageSrc: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAAAAACPAi4CAAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAABAAAAAQADq8/hgAAAEaElEQVRYw82X6XLbNhCA+f4PVomk5MRyHDtp63oEgDcl3vfRBQhQIEVKSvsnO+OxRBEfFnthV+n/pyi/NaCryzzL8rJu/wOgzQPXJBgjhDExnXPW/Aqgy30DI0yIwYQQ4Bhe2j0I6BIbI1jL9meC2TdkRu0jgMxCGN5H2HT8IIzjKPAdE9NngEjuAhqfv3rOpe3aIrDAFoB1qtuA3ADlMXKuz9vlLqZokt4CxPAOQXa2bPDCRVSJYB0QIDA4ibp+TVKDbuCvAeh6YpX9DWkcUGJCkAARXW9UfXeL0PmUcF4CZBA4cALv5nqQM+yD4mtATQMOGMi9RzghiKriCuBiAzsB1e8uwUUGtroZIAEsqfqHCI2JjdGZHNDSZzHYb0boQK4JOTVXNQFEoJXDPskEvrYTrJHgIwOdZEBrggXzfkbo+sY7Hp0Fx9bUYbUEAAtgV/waHAcCnOew3arbLy5lVXGSXIrKGQkrKKMLcnHsPjEGAla1PYi+/YCV37e7DRp1qUDjwREK1wjbo56hezRoPLxt9lzUg+m96Hvtz3BMcU9syQAxKBSJ/c2Nqv0Em5C/97q+BdGoEuoORN98CkAqzsAAPh690vdv2tOOEcx/dodP0zq+qjpoQQF7/Vno2UA0OgLQQbUZI6t/1+BlRgAlyywvqtNXja0HFQ7jGVwoUA0HUBNcMvRdpW8PpzDPYRAERfmNE/TDuE8Ajis4oJAiUwB2+g+am3YEEmT5kz4HgOdRygHUIPEMsFf/YvXJYoSKbPczQI4HwysSbKKBdk4dLAhJsptrUHK1lSERUDYD6E9pGLsjoXzRZgAIJVaYBCCfA57zMBoJYfV9CXDigHhRgww2Hgngh4UjnCUbJAs2CEdCkl25kbou5ABh0KkXPupA6IB8fOUF4TpFOs5Eg50eFSOBfOz0GYCWoJwDoJzwcjQBfM2rMAjD0CEsL/Qp4ISG/FHkuJ4A9toXv66KomosMMNAuAA6GxOWPwqP64sb3kTm7HX1Fbsued9BXjACZKNIphLz/FF4WIps6vqff+jaIFAONiBbTf1hDITti5RLg+cYoDOxqJFwxb0dXmT5Bn/Pn8wOh9dQnMASK4aaSGuk+G24DObCbm5XzkXs9RdASTuytUZO6Czdm2BCA2cSgNbIWedxk0AV4FVYEYFJpLK4SuA3DrsceQEQl6svXy33CKfxIrwAanqZBA8R4AAQWeUMwJ6CZ7t7BIh6utfos0uLwxqP7BECMaTUuQCoawhO+9sSUWtjs1kA9I1Fm8DoNiCl64nUCsp9Ym1SgncjoLoz7YTl9dNOtbGRYSAjWbMDNPKw3py0otNeufVYN2wvzha5g6iGzlTDebsfEdbtW9EsLOvYZs06Dmbsq4GjcoeBgThBWtRN2zZ1mYUuGZ7axfz9hZEns+mMQ+ckzIYm/gn+WQvWWRq6uoxuSNi4RWWAYGfRuCtjXx25Bh25MGaTFzaccCVX1wfPtkiCk+e6nh/ExXps/N6z80PyL8wPTYgPwzDiAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDExLTAxLTE5VDAzOjU5OjAwKzAxOjAwaFry6QAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxMC0xMi0yMVQxNDozMDo0NCswMTowMGxOe/8AAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAAElFTkSuQmCC",
                }
            };
            var img = new Image();
            img.onload = function () {
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, 120, 120);
            }
            img.src = model.imageSrc;
            context.imageSrc = model.imageSrc;
        };

        var canvasDraw = function (options, _context) {
            var model = (options && options.model) ? options.model : null;
            var context = (_context) ? _context : this;
            var canvas = context.$('#avatar')[0];
            var inputFile = context.$('#inputImg');
            var that = context;
            inputFile.on('change', function () {
                var file = inputFile[0].files[0];
                var fr = new FileReader();
                fr.onload = function () {
                    var src = "data:image/jpg;base64," + btoa(fr.result);
                    if (model) {
                        model.imageSrc = src;
                    } else {
                        model = {
                            imageSrc: src
                        }
                    }
                    canvasDrawing({ model: model, canvas: canvas }, context);
                };
                fr.readAsBinaryString(file);
            });
            canvasDrawing({ model: model }, context);
        };

        var displayControlBtnsByActionType = function(actionType){
        $("#saveDiscardHolder").hide();
        $("#top-bar-createBtn").hide();
        $("#top-bar-deleteBtn").hide();
        $("#top-bar-editBtn").hide();
        $("#top-bar-renameBtn").hide();
        $("#top-bar-nextBtn").hide();
        $("#top-bar-discardBtn").hide();
        $('#top-bar-saveBtn').hide();
        if(!actionType || actionType === "Content")
            $("#top-bar-createBtn").show();
        else if(actionType === "View"){
            $('#top-bar-createBtn').show();
            $('#top-bar-editBtn').show();
            $('#top-bar-deleteBtn').show();
        }
        else if(actionType === "Edit"){
            $('#top-bar-saveBtn').show();
            $('#top-bar-discardBtn').show();
            $("#saveDiscardHolder").show();
        }
        else if(actionType === "Create"){
            $('#top-bar-saveBtn').hide();
            $('#top-bar-nextBtn').show();
            $('#top-bar-discardBtn').show();
            $("#saveDiscardHolder").show();
        }
    }

    return {
        utcDateToLocaleDate:utcDateToLocaleDate,
        toObject: toObject,
        displayControlBtnsByActionType : displayControlBtnsByActionType,
        ISODateToDate: ISODateToDate,
        hexToRgb: hexToRgb,
        deleteEvent: deleteEvent,
        canvasDraw: canvasDraw,
        contentHolderHeightFixer: contentHolderHeightFixer
    }
});