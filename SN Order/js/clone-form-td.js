/*
Author: Tristan Denyer (based on Charlie Griefer's original clone code, and some great help from Dan - see his comments in blog post)
Plugin repo: https://github.com/tristandenyer/Clone-section-of-form-using-jQuery
Demo at http://tristandenyer.com/using-jquery-to-duplicate-a-section-of-a-form-maintaining-accessibility/
Ver: 0.9.4.1
Last updated: Sep 24, 2014

The MIT License (MIT)

Copyright (c) 2011 Tristan Denyer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
$(function() {
    $('#btnAdd').click(function() {
      // console.log("5555");
        var num = $('.clonedInput').length, // Checks to see how many "duplicatable" input fields we currently have
            newNum = new Number(num + 1), // The numeric ID of the new input field being added, increasing by 1 each time
            newElem = $('#entry' + num).clone().attr('id', 'entry' + newNum).fadeIn('slow'); // create the new element via clone(), and manipulate it's ID using newNum value

        /*  This is where we manipulate the name/id values of the input inside the new, cloned element
            Below are examples of what forms elements you can clone, but not the only ones.
            There are 2 basic structures below: one for an H2, and one for form elements.
            To make more, you can copy the one for form elements and simply update the classes for its label and input.
            Keep in mind that the .val() method is what clears the element when it gets cloned. Radio and checkboxes need .val([]) instead of .val('').
        */
        //H2 - section
        newElem.find('.heading-reference').attr('id', 'ID' + newNum + '_reference').attr('name', 'ID' + newNum + '_reference').html('Entry #' + newNum);

        // Title - select
        newElem.find('.label_ul').attr('for', 'ID' + newNum + '_sn_ul');
        newElem.find('.input_ul').attr('id', 'ID' + newNum + '_sn_ul').attr('name', 'ID' + newNum + '_sn_ul').val('');

        // First name - text
        newElem.find('.label_month').attr('for', 'ID' + newNum + '_sn_month');
        newElem.find('.input_month').attr('id', 'ID' + newNum + '_sn_month').attr('name', 'ID' + newNum + '_sn_month').val('');
        newElem.find('.btn').attr('data-field', 'ID' + newNum + '_sn_month').val('');

        // Last name - text
        newElem.find('.label_notional').attr('for', 'ID' + newNum + '_sn_notional');
        newElem.find('.input_notional').attr('id', 'ID' + newNum + '_sn_notional').attr('name', 'ID' + newNum + '_sn_notional').val('');
        //$('.sn_notional').attr('value',$('.sn_notional'.val()));
        //alert($('.sn_notional').attr('value'));
        // Color - checkbox
        //newElem.find('.label_checkboxitem').attr('for', 'ID' + newNum + '_checkboxitem');
        //newElem.find('.input_checkboxitem').attr('id', 'ID' + newNum + '_checkboxitem').attr('name', 'ID' + newNum + '_checkboxitem').val([]);

        // Skate - radio
        //newElem.find('.label_radio').attr('for', 'ID' + newNum + '_radioitem');
        //newElem.find('.input_radio').attr('id', 'ID' + newNum + '_radioitem').attr('name', 'ID' + newNum + '_radioitem').val([]);

        // Email - text
        newElem.find('.label_strike').attr('for', 'ID' + newNum + '_sn_strike');
        newElem.find('.input_strike').attr('id', 'ID' + newNum + '_sn_strike').attr('name', 'ID' + newNum + '_sn_strike').val('');

        // Twitter handle (for Bootstrap demo) - append and text
        newElem.find('.label_spot').attr('for', 'ID' + newNum + '_sn_spot');
        newElem.find('.input_spot').attr('id', 'ID' + newNum + '_sn_spot').attr('name', 'ID' + newNum + '_sn_spot').val('');

        // Insert the new element after the last "duplicatable" input field
        $('#entry' + num).after(newElem);
        //alert($('#sn_notional').attr('value') + $('#sn_notional').val());
        $('#ID' + newNum + '_sn_ul').val($('#sn_ul').val());
        $('#ID' + newNum + '_sn_month').val($('#sn_month').val());
        $('#ID' + newNum + '_sn_notional').val($('#sn_notional').val());
        $('#ID' + newNum + '_sn_spot').val($('#sn_spot').val());
        $('#ID' + newNum + '_sn_strike').val($('#sn_strike').val());
        //$('#sn_notional').val('333')
        $('#ID' + newNum + '_sn_ul').focus();

        // Enable the "remove" button. This only shows once you have a duplicated section.
        $('#btnDel').attr('disabled', false);

        // Right now you can only add 4 sections, for a total of 5. Change '5' below to the max number of sections you want to allow.
        if (newNum == 5)
            $('#btnAdd').attr('disabled', true).prop('value', "You've reached the limit"); // value here updates the text in the 'add' button when the limit is reached

    });

    $('#btnDel').click(function() {
        // Confirmation dialog box. Works on all desktop browsers and iPhone.
        if (confirm("Are you sure you wish to remove this section? This cannot be undone.")) {
            var num = $('.clonedInput').length;
            // how many "duplicatable" input fields we currently have
            $('#entry' + num).slideUp('slow', function() {
                $(this).remove();
                // if only one element remains, disable the "remove" button
                if (num - 1 === 1)
                    $('#btnDel').attr('disabled', true);
                // enable the "add" button
                $('#btnAdd').attr('disabled', false).prop('value', "add section");
            });
        }
        return false; // Removes the last section you added
    });
    // Enable the "add" button
    $('#btnAdd').attr('disabled', false);
    // Disable the "remove" button
    $('#btnDel').attr('disabled', true);
});
$(function() {
    $(document).on('click', '.btn-add', function(e) {
        e.preventDefault();

        var controlForm = $('.controls form:first'),
            currentEntry = $(this).parents('.entry:first'),
            newEntry = $(currentEntry.clone()).appendTo(controlForm);

        newEntry.find('input').val('');
        controlForm.find('.entry:not(:last) .btn-add')
            .removeClass('btn-add').addClass('btn-remove')
            .removeClass('btn-success').addClass('btn-danger')
            .html('<span class="glyphicon glyphicon-minus"></span>');
    }).on('click', '.btn-remove', function(e) {
        $(this).parents('.entry:first').remove();

        e.preventDefault();
        return false;
    });
});
$( function() {
    var availableTags = [
      "ADVANC",
      "AOT",
      "BCP",
      "BANPU"

    ];
    $( "#sn_ul" ).autocomplete({
      source: availableTags
    });
  } );
